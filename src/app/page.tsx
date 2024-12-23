// import styles from './page.module.scss';
import Input from '@/shared/Input/Input';
import TextArea from '@/shared/TextArea/TextArea';

export default function Home() {
  return (
    <form style={{ width: '50%' }}>
      <Input type="text" placeholder="이메일" id="email" title="이메일" />
      <Input
        type="password"
        placeholder="비밀번호"
        id="password"
        title="비밀번호"
        minLength={8}
      />
      <Input
        type="text"
        placeholder="닉네임"
        id="nickname"
        title="닉네임"
        maxLength={10}
      />
      <Input id="file" type="file" />
      <Input id="file1" type="file" multiple />
      <TextArea
        id="textarea"
        placeholder="상품 설명을 입력해 주세요"
        maxLength={10}
      />
      <textarea maxLength={10}></textarea>
    </form>
  );
}
