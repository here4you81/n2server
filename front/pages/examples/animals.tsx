import type { NextPage,GetServerSideProps } from 'next'


const Home: NextPage = () => {
  return (
    <h2>Animal Example</h2>
  );
}

export const getServerSideProps:GetServerSideProps = async () => {
    const res = await fetch('https://.../data')
    const data: Data = await res.json()
  
    return {
      props: {
        data,
      },
    }
  }

export default Home
