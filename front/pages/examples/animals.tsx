import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Animal } from "../../../dto/dist/Animal"
import axios from 'axios';

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const animals: Animal[] = data;

  return (
    <div>
      <h3>Animal Example</h3>
      {animals.map((animal) => (
        <div>
          <p>name: {animal.name}</p>
          <p>coloe: {animal.color}</p>
          <p>age: {animal.age}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3001/animals/');
  const data: Animal[] = res.data as any as Animal[];

  return {
    props: { data }
  }
}

export default Page
