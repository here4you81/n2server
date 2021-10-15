import type { NextPage,GetServerSideProps } from 'next'

type Data = {
    name: string,
    aa: number,
    aaa:number
  }

const Home: NextPage = () => {
  return (
    <h2>Animal Example</h2>
  );
}

export const getServerSideProps:GetServerSideProps = async () => {
    const res = await fetch('https://.../data');
    const data = await res.json();
    const aa = 111;
  
    return {
      props: {
        data,
      },
    }
  }

export default Home
