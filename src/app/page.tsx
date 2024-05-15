'use client'
import Layout from "./components/Layout";
import ProductList from "./components/ProductList";
export default function Home() {
  return (
    <Layout title={"Home"} description={"Home page"} >
      <ProductList />
    </Layout>

  );
}
