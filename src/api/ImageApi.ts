import axiosInstance from '@/lib/axiosInstance';
import { ImageRequest, ImageResponse } from './type/Image';

/*** 이미지 업로드
 * 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다.
 */
export const postImagesUpload = async (
  data: ImageRequest
): Promise<ImageResponse> => {
  // create formdata
  const formData = new FormData();
  formData.append('image', data.file);
  const URL = `/images/upload`;
  const res = await axiosInstance.post(URL, formData);
  return res.data;
};
