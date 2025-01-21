'use client';

import { useEffect, useRef, useState } from 'react';
import useAuthGuard from '@/hook/useAuthGuard';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import {
  GetProductsRequest,
  ProductRequest,
  ProductResponse,
} from '@/api/type/Product';
import { ImageResponse } from '@/api/type/Image';
import { useQuery } from '@tanstack/react-query';
import { categoryQuery, productsQuery } from '@/api/query';
import useDropdownStore from '@/shared/dropdown/useDropdownStore';
import Dropdown from '@/shared/dropdown/Dropdown';
import Input from '@/shared/input/Input';
import TextArea from '@/shared/TextArea/TextArea';
import Open from '/public/icon/ic-dropdown.svg';
import Close from '/public/icon/ic-dropup.svg';
import Button from '@/shared/button/Button';
import styles from './addProduct.module.scss';

export type CombinedRequest = ProductRequest & {
  file: FileList;
};

const AddProduct = () => {
  useAuthGuard();

  const { register, handleSubmit, getValues, setValue, control } =
    useForm<CombinedRequest>();

  const params: GetProductsRequest = {
    order: 'reviewCount',
    category: getValues('categoryId'),
  };

  const { data: invalidData } = useQuery(productsQuery(params).all());
  const products = invalidData?.list || [];
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    if (!data) return;

    const productName = getValues('name');
    const duplicateProduct = products.find(
      (product) => product.name === productName
    );

    setIsDuplicate(!!duplicateProduct);
  }, [invalidData, getValues]);

  const { mutate: imageUpload } = useMutation<
    ImageResponse,
    AxiosError,
    FormData
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

  const watchedValues = useWatch({
    control,
  });

  const isFormValid =
    (watchedValues.file?.length ?? 0) > 0 &&
    watchedValues.name &&
    watchedValues.categoryId &&
    (watchedValues.description?.length ?? 0) >= 10;

  const { mutate: addProduct } = useMutation<
    ProductResponse,
    AxiosError,
    ProductRequest
  >({
    mutationFn: (data) =>
      axiosInstance.post(`/products`, data).then((response) => response.data),
    onSuccess: () => {
      window.location.reload(); //임시 초기화
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message: string })?.message;
      console.log(message);
    },
  });

  const { data } = useQuery(categoryQuery.all());
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const names = data.map((category) => category.name);
      setOptions(names);
    }
  }, [data]);

  const dropdownId = useRef('selectCategory');
  const divRef = useRef<HTMLDivElement>(null);

  const { dropdowns, openDropdown, closeDropdown } = useDropdownStore();

  const addDropdown = dropdowns[dropdownId.current];
  const addDropdownView = addDropdown?.isVisible;
  const selectCategory = addDropdown?.selectedOption;

  useEffect(() => {
    if (!data) return;
    const selectedCategory = data.find(
      (category) => category.name === selectCategory
    );
    if (selectedCategory) {
      setValue('categoryId', selectedCategory.id);
    }
  }, [selectCategory, setValue, data]);

  const toggleDropdown = () => {
    if (addDropdownView) {
      closeDropdown(dropdownId.current);
    } else {
      openDropdown(dropdownId.current);
    }
  };

  const handleClose = () => {
    closeDropdown(dropdownId.current);
  };

  const onSubmit: SubmitHandler<CombinedRequest> = async (data) => {
    try {
      if (isDuplicate) {
        alert('해당 카테고리에 동일한 상품이 등록되어 있어요.');
        return;
      }

      const imageData = new FormData();
      const file = data.file?.[0];
      console.log(data);

      if (file) {
        imageData.append('image', file);
      }

      const imageResponse = await new Promise<ImageResponse>(
        (resolve, reject) => {
          imageUpload(imageData, {
            onSuccess: (res) => resolve(res),
            onError: (err) => reject(err),
          });
        }
      );

      const { categoryId, description, name } = data;

      const productData = {
        categoryId,
        description,
        name,
        image: imageResponse.url,
      };

      addProduct(productData);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className={styles.form}
    >
      <div className={styles.inputWrapper}>
        <div className={styles.image}>
          <Input
            type="file"
            {...register('file')}
            customFileInput={styles.upload}
          />
        </div>

        <div className={styles.details}>
          <Input type="text" placeholder="상품명" {...register('name')} />

          <div
            ref={divRef}
            onClick={toggleDropdown}
            role="listbox"
            className={styles.dropdown}
          >
            {selectCategory || <span>카테고리 선택</span>}
            {!addDropdownView ? <Open /> : <Close />}
          </div>
          {addDropdownView && (
            <Dropdown
              onClose={handleClose}
              options={options}
              dropdownId={dropdownId.current}
              parentRef={divRef}
              customDropdownStyle={styles.customDropdownStyle}
              {...register('categoryId')}
            />
          )}

          <TextArea
            maxLength={500}
            placeholder="상품 설명"
            {...register('description', {
              minLength: {
                value: 10,
                message: '상품 설명은 10자 이상 등록해주세요.',
              },
            })}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isFormValid}
        className={classNames(styles.submitButton, {
          [styles.disabled]: !isFormValid,
        })}
      >
        올리기
      </Button>
    </form>
  );
};

export default AddProduct;
