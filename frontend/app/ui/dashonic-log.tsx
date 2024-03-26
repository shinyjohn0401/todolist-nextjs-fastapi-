import Image from 'next/image';

export default function DashonicLogo() {
  return (
    <div className={`flex flex-row items-center leading-none`}>
      <Image
        src="/image/logo-dark.png"
        className="rounded-fill"
        alt={`Dashonic Logo`}
        width={100}
        height={16}
      />
    </div>
  );
}
