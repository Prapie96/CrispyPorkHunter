import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { sizeIcon } from '../consts/const'

interface ReviewListProps {
  reviews: string[];
}

export default function ReviewsList({reviews}:ReviewListProps) {
  if (!reviews || reviews.length === 0) return null;
  return (
      <section>
        <strong className="text-xl text-left pl-2">ตัวอย่าง Reviews</strong>
        <div className="bottom-2 flex flex-col gap-2 p-2 text-left">
          {reviews?.map((comment, index) => (
            <div
              key={`review-${index}`}
              className="w-full flex flex-col gap-2 mb-2"
            >
              <div className="flex gap-3 items-center">
                <FaUser size={sizeIcon} color="orange" />
                <p className="text-sm font-medium">
                  ผู้ใช้ไม่ระบุตัวตน {index + 1}
                </p>
              </div>
              <div className="bg-amber-300 rounded-2xl p-3 shadow-sm text-amber-900">
                <span>{comment}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}
