import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex justify-between h-14 items-center px-10">
        <div>
          Logo
        </div>
        <div className="flex gap-4">
          <Link href="/sign-in">Sign-in</Link>
          <Link href="/sign-up">Sign-up</Link>
        </div>
      </header>
    </div>
  );
}
