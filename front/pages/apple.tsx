import { InferGetServerSidePropsType,GetServerSideProps } from 'next'
import { N2Props } from "../../dto/build/src/N2Props";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async () => {

    var data = {};

    try {
        const res = await axios.get('http://localhost:3000/api/apple'); 
        console.log(res.data);
        
    
        if (res.data) {
            data = res.data as N2Props;
        }
        
        return {
            props: data,
        }
        
    } catch (e) {
        return {
            props: data,
        }
        
    }
}


function Page(data: N2Props) {
    
    return (
        <div>
            <h2>apiName: {data.apiName}</h2>
            <h3>index: {data.index}</h3>
            <h3>message: {data.message}</h3>
        </div>
    );
}

export default Page