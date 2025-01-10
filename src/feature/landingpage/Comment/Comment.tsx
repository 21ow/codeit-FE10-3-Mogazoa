'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getProductsReviews } from '@/api/productApi';
import { GetProdcutReviewResponse } from '@/api/type/Product';
import ImageComponent from '@/shared/Image/Images';
type CoCardProps = {
  productId: number;
  onCommentEditSuccess: (
    updatedComment: GetProdcutReviewResponse['list'][number]
  ) => void;
};

const CoCard = ({ productId }: CoCardProps) => {
  const [comments, setComments] = useState<GetProdcutReviewResponse['list']>(
    []
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getProductsReviews(productId);
      setComments(data.list || []);
    };

    fetchInitialData();
  }, [productId]);

  return (
    <div className={styles.articleContain}>
      {comments.length > 0 ? (
        <div className={styles.insideContain}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.innerContain}>
              <div className={styles.photoInfo1}>
                {comment.reviewImages?.map((image) => (
                  <ImageComponent
                    key={image.id}
                    src={image.source}
                    alt={`Review image ${image.id}`}
                    width={60}
                    height={60}
                  />
                ))}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.topInfo}>
                  <div className={styles.photoInfo}>
                    <ImageComponent
                      src={comment.user.image}
                      alt={`${comment.user.nickname}'s profile`}
                      width={30}
                      height={30}
                    />
                  </div>
                  .<p className={styles.name}>{comment.user.nickname}</p>
                </div>
                <p className={styles.updatedAt}>
                  {new Date(comment.updatedAt).toLocaleDateString()}
                </p>
                <p className={styles.content}>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>등록된 댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CoCard;
