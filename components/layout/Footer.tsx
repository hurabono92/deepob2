import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text mt-auto">
      <div className="mx-auto max-w-[1200px] px-4 py-10 text-sm leading-7">
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
          <Link href="/privacy" className="hover:text-white">
            개인정보처리방침
          </Link>
          <span className="opacity-40">|</span>
          <Link href="/email-policy" className="hover:text-white">
            이메일무단수집거부
          </Link>
          <span className="opacity-40">|</span>
          <Link href="/about/location" className="hover:text-white">
            오시는길
          </Link>
        </div>

        <p>
          주소. (08792) 서울특별시 관악구 낙성대로3길 15 (봉천동) 사단법인
          깊은순종 &nbsp; Tel. 070-4163-5243 &nbsp; Fax. 02-888-1285 &nbsp;
          E-mail. deepob@naver.com
        </p>
        <p>Copyright &copy; {new Date().getFullYear()} 사단법인 깊은순종. All rights reserved.</p>
        <p className="mt-1 text-xs opacity-60">
          자원봉사참여 배너 사진: Louise Docker,{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Love_heart.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Wikimedia Commons
          </a>{" "}
          (CC BY 2.0)
        </p>
      </div>
    </footer>
  );
}
