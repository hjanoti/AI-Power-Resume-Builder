// Shared shimmer block. Every loading placeholder below is built from this so
// the whole app animates at the same rhythm.
export const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse rounded bg-slate-200 ${className}`} />
);

export const ResumeCardSkeleton = () => (
    <div className="h-52 w-full flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-2 w-16" />
    </div>
);

export const DashboardSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
            <ResumeCardSkeleton key={i} />
        ))}
    </div>
);

export const BuilderSkeleton = () => (
    <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4 rounded-lg border border-gray-200 bg-white p-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-56" />
            <Skeleton className="size-16 rounded-full" />
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2 pt-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
        </div>
        <div className="lg:col-span-7">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-8">
                <Skeleton className="mx-auto h-7 w-56" />
                <Skeleton className="mx-auto h-3 w-72" />
                <Skeleton className="h-px w-full" />
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-full" />
                ))}
            </div>
        </div>
    </div>
);

export default Skeleton;
