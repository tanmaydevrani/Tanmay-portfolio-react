import React from "react";

export function Skeleton({ height = 20, width = "100%", borderRadius = "var(--radius-md)", className = "" }) {
  return (
    <div
      className={`skeleton-base ${className}`}
      style={{ height, width, borderRadius, flexShrink: 0 }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="ios-card p-5 flex flex-col gap-3">
      <Skeleton height={180} borderRadius="var(--radius-lg)" />
      <Skeleton height={22} width="70%" />
      <Skeleton height={14} />
      <Skeleton height={14} width="85%" />
      <div className="flex gap-2 mt-1">
        <Skeleton height={24} width={70} borderRadius="var(--radius-full)" />
        <Skeleton height={24} width={60} borderRadius="var(--radius-full)" />
        <Skeleton height={24} width={80} borderRadius="var(--radius-full)" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="ios-card p-5 flex flex-col gap-3">
      <Skeleton height={160} borderRadius="var(--radius-lg)" />
      <div className="flex gap-2">
        <Skeleton height={20} width={60} borderRadius="var(--radius-full)" />
        <Skeleton height={20} width={80} borderRadius="var(--radius-full)" />
      </div>
      <Skeleton height={24} width="80%" />
      <Skeleton height={14} />
      <Skeleton height={14} width="60%" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="page-container flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-3">
        <Skeleton height={40} width={200} />
        <Skeleton height={16} width={300} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export default Skeleton;
