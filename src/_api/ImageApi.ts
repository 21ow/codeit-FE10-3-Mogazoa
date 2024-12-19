import axios from 'axios';
import sessionStorage from './storage/sessionStorage';
import { getAccessToken, _LOGIN_NEED_MESSAGE_ } from './storage/authStorage';
import { ImageRequest, ImageResponse } from './type/Image';

/*** 이미지 업로드
 * 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다.
 */
export const postImagesUpload = async (
  data: ImageRequest
): Promise<ImageResponse> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error(`Failed to getAccessToken(), ${_LOGIN_NEED_MESSAGE_}`);
  }

  // create formdata
  const formData = new FormData();
  formData.append('image', data.file);

  const URL = `/images/upload`;
  console.log('POST - postImagesUpload(): ', URL);

  try {
    const res = await axios.post(URL, formData, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ImageResponse;
      sessionStorage.setItem(`postImagesUpload`, resData);
      return resData;
    } else {
      throw new Error(
        `Failed to postImagesUpload() res.status: ${res.status}, res.data: ${res.data}`
      );
    }
  } catch (error) {
    throw error;
  }
};
