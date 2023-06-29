import { GetServerSidePropsContext } from 'next';
import React from 'react'

export async function getServerSideProps({
    params,
}: GetServerSidePropsContext) {
    const slug = params?.slug

    console.log(slug)
    return {
        props: {
        },
    };
}

const Order = () => {
    return (
        <div>Order</div>
    )
}

export default Order