import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <Image
        src="/Primera-bgremoved.png"
        alt="PRIMERA"
        width={96}
        height={96}
        priority
        className="h-24 w-24"
      />

      <p className="eyebrow mt-8 text-cream/40">404</p>

      <h1 className="mt-4 font-serif text-5xl font-light text-cream md:text-6xl">
        Page Not Found
      </h1>

      <p className="mt-5 max-w-md font-sans text-sm font-light leading-relaxed text-cream/55">
        The piece you&rsquo;re looking for has wandered off — much like our
        best essentials tend to.
      </p>

      <Link
        href="/"
        className="btn-solid mt-10 bg-cream text-ink hover:bg-cream/85"
      >
        Return Home
      </Link>
    </main>
  );
}
