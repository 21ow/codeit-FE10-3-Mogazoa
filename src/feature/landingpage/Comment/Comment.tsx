'use client';
import { useEffect, useState, useRef } from 'react';
import { getProductsReviews } from '@/api/productApi';
import { GetProductReviewsResponse } from '@/api/type/Product';
import ImageComponent from '@/shared/Image/Images';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from '@/api/query';
import RatingStar from '@/feature/landingpage/RatingStar/RatingStar';
import ThumbCheck from '@/feature/landingpage/ThumbCheck/ThumbCheck';
import ReviewEdit from './Edit/ReviewEdit';
import ReviewDelete from './Delete/ReviewDelete';
import styles from './styles.module.scss';
import Dropdown from '@/shared/dropdown/Dropdown';
import useDropdownStore from '@/shared/dropdown/useDropdownStore';

type CoCardProps = {
  productId: number;
};
const CoCard = ({ productId }: CoCardProps) => {
  const [comments, setComments] = useState<GetProductReviewsResponse['list']>(
    []
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const { data: user } = useQuery(userQuery.all());
  const { dropdowns, openDropdown, closeDropdown } = useDropdownStore();
  const dropdownId = useRef('Comment');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDropdownClick = () => {
    if (dropdowns[dropdownId.current]?.isVisible) {
      closeDropdown(dropdownId.current);
    } else {
      openDropdown(dropdownId.current);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const order = dropdowns[dropdownId.current]?.selectedOption ?? 'recent';
      const data = await getProductsReviews(productId, order);
      setComments(data.list || []);
    };

    fetchReviews();
  }, [productId, dropdowns[dropdownId.current]?.selectedOption]);

  const handleEditSuccess = (
    updatedReview: GetProductReviewsResponse['list'][number]
  ) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === updatedReview.id ? updatedReview : comment
      )
    );
    setEditingCommentId(null);
  };

  const handleEditClick = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleDeleteSuccess = (deletedReviewId: number) => {
    setComments((prev) =>
      prev.filter((comment) => comment.id !== deletedReviewId)
    );
  };

  return (
    <div className={styles.articleContain}>
      <div className={styles.titleContainer}>
        <h3 className={styles.titleName}>상품 리뷰</h3>
        <div className={styles.dropdownContainer}>
          <button onClick={handleDropdownClick} ref={buttonRef}>
            {dropdowns[dropdownId.current]?.selectedOption ?? 'recent'}
          </button>
          {dropdowns[dropdownId.current]?.isVisible && (
            <Dropdown
              options={['recent', 'ratingAsc', 'ratingDesc', 'likeCount']}
              dropdownId={dropdownId.current}
              parentRef={buttonRef}
              customVisible={styles.visiBle}
              customDropdownStyle={styles.dropDown}
              customItemStyle={styles.dropdownItem}
              onClose={() => closeDropdown(dropdownId.current)}
            />
          )}
        </div>
      </div>

      {comments.length > 0 ? (
        <div className={styles.insideContain}>
          {comments.map((comment) => {
            const isOwner = user?.id === comment.userId;
            return (
              <div key={comment.id} className={styles.commentContainer}>
                {editingCommentId === comment.id ? (
                  <ReviewEdit
                    reviewId={comment.id}
                    currentContent={comment.content}
                    currentRating={comment.rating}
                    currentReviewImages={comment.reviewImages || []}
                    onEditSuccess={(updatedReview) => {
                      const updatedData = {
                        ...updatedReview,
                        id: comment.id,
                        user: comment.user,
                        updatedAt: comment.updatedAt,
                        productId: comment.productId,
                        reviewImages: comment.reviewImages,
                      };
                      handleEditSuccess(updatedData);
                    }}
                    onCancel={handleCancelEdit}
                  />
                ) : (
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
                      <div className={styles.bottomInfo2}>
                        <div className={styles.frontContainer}>
                          <p className={styles.updatedAt}>
                            {new Date(comment.updatedAt).toLocaleDateString()}
                          </p>
                          {isOwner && (
                            <div className={styles.buttonContainer}>
                              <button
                                className={styles.editButton}
                                onClick={() => handleEditClick(comment.id)}
                              >
                                <p className={styles.editName}>수정</p>
                              </button>
                              <ReviewDelete
                                reviewId={comment.id}
                                onDeleteSuccess={() =>
                                  handleDeleteSuccess(comment.id)
                                }
                              />
                            </div>
                          )}
                        </div>
                        <ThumbCheck
                          reviewId={comment.id}
                          productId={productId}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>등록된 댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CoCard;
