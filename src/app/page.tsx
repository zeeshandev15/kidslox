'use client';

import { useRouter } from 'next/navigation';

import { paths } from '@/paths';

const page = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push(paths.auth.signIn);
  }, 3000);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'Center',
          overflow: 'hidden',
        }}
      >
        <div className="loader">
          <span>K</span>
          <span>I</span>
          <span>D</span>
          <span>S</span>
          <span>L</span>
          <span className="half-colored-heart">💚</span>

          <span>X</span>
        </div>
      </div>
    </>
  );
};

export default page;
