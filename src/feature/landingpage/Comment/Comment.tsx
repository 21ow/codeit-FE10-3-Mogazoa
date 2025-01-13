'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getProductsReviews } from '@/api/productApi';
import { GetProdcutReviewResponse } from '@/api/type/Product';
import ImageComponent from '@/shared/Image/Images';
import RatingStar from '@/feature/landingpage/RatingStar/RatingStar';

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
            <div key={comment.id} className={styles.commentContainer}>
              {/* 댓글 하나당 하나의 독립적인 컨테이너 */}
              <div className={styles.innerContain}>
                <div className={styles.userInfo}>
                  <div className={styles.topInfo}>
                    <div className={styles.photoInfo}>
                      <ImageComponent
                        src={comment.user.image}
                        alt={`${comment.user.nickname}'s profile`}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.nameInfo}>
                      <p className={styles.nameBlock}>
                        {comment.user.nickname}
                      </p>
                      <RatingStar rating={comment.rating} />
                    </div>
                  </div>
                </div>
                <div className={styles.bottomInfo}>
                  <p className={styles.contentBlock}>{comment.content}</p>
                  <div className={styles.photoInfo1}>
                    {comment.reviewImages?.map((image) => (
                      <div key={image.id} className={styles.photoContainer}>
                        <ImageComponent
                          src={image.source}
                          alt={`Review image ${image.id}`}
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                  <p className={styles.updatedAt}>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </p>
                </div>
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
