import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-black p-4">
      <div className="m-4 flex justify-around items-start">
        {/* 左 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">LR Brother</h3>
        </div>

        {/* 真ん中 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Service</h3>
          <div className="flex flex-col space-y-2">
            <Link
              href="https://liberuntime.com"
              className="hover:underline"
              target="_blank"
            >
              TeckBlog
            </Link>
            <Link
              href="https://misskey.liberuntime.com"
              className="hover:underline"
              target="_blank"
            >
              Misskey
            </Link>
          </div>
        </div>

        {/* 右 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Connection</h3>
          <p>Mail</p>
          <Link
            href="mailto:ao.lr.like.brothers@gmail.com"
            className="hover:underline"
          >
            ao.lr.like.brothers
          </Link>
        </div>
      </div>
    </footer>
  );
}
