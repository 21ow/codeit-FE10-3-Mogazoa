'use client';

import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/shared/input/Input';
import TextArea from '@/shared/TextArea/TextArea';
import Dropdown from '@/shared/dropdown/Dropdown';
import Button from '@/shared/button/Button';
import { useMutation } from '@tanstack/react-query';
import { ProductRequest, ProductResponse } from '@/api/type/Product';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { ImageRequest, ImageResponse } from '@/api/type/Image';
import useDropdownStore from '@/shared/dropdown/useDropdownStore';

const AddProduct = () => {
  const { register, handleSubmit, setValue } = useForm<ProductRequest>();

  const { mutate: imageUpload } = useMutation<
    ImageResponse,
    AxiosError,
    ImageRequest
  >({
    mutationFn: (data) =>
      axiosInstance
        .post(`/images/upload`, data)
        .then((response) => response.data),
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.error(message);
    },
  });

  const { mutate: addProduct } = useMutation<
    ProductResponse,
    AxiosError,
    ProductRequest
  >({
    mutationFn: (data) =>
      axiosInstance.post(`/products`, data).then((response) => response.data),
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.log(message);
    },
  });

  const dropdownId = useRef('selectCategory');
  const divRef = useRef<HTMLDivElement>(null);

  const { dropdowns, openDropdown, closeDropdown } = useDropdownStore();

  const options = ['1', '2', '3'];
  const selectCategory =
    dropdowns[dropdownId.current]?.selectedOption || '옵션 선택';

  console.log(selectCategory, typeof selectCategory, Number(selectCategory));

  const toggleDropdown = () => {
    if (dropdowns[dropdownId.current]?.isVisible) {
      closeDropdown(dropdownId.current);
    } else {
      openDropdown(dropdownId.current);
    }
  };

  const handleClose = () => {
    closeDropdown(dropdownId.current);
  };

  const onSubmit: SubmitHandler<ProductRequest> = async (data) => {
    try {
      console.log(data);
      const imageData = new FormData();
      const file = data.image[0];
      if (file) {
        imageData.append('image', file);
      }

      const imageResponse = await new Promise<ImageResponse>(
        (resolve, reject) => {
          imageUpload(imageData as unknown as ImageRequest, {
            onSuccess: (res) => resolve(res),
            onError: (err) => reject(err),
          });
        }
      ); //임시 강제 형변환

      const { image, ...rest } = data;

      const productData = {
        ...rest,
        image: imageResponse.url,
      };

      addProduct(productData);
    } catch (error) {
      console.error('상품 등록 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    setValue('categoryId', Number(selectCategory)); //
  }, [selectCategory, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Button type="submit">올리기</Button>
      <Input type="file" {...register('image')} />
      <Input type="text" placeholder="상품명" {...register('name')} />
      <div ref={divRef} onClick={toggleDropdown} role="listbox">
        {selectCategory}
      </div>
      {dropdowns[dropdownId.current]?.isVisible && (
        <Dropdown
          onClose={handleClose}
          options={options}
          dropdownId={dropdownId.current}
          parentRef={divRef}
          {...register('categoryId')}
        />
      )}
      <TextArea
        maxLength={500}
        placeholder="상품 설명"
        {...register('description', {
          required: true,
          minLength: {
            value: 10,
            message: '상품 설명은 10자 이상 등록해주세요.',
          },
        })}
      />
    </form>
  );
};

export default AddProduct;
