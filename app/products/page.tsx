import dynamic from "next/dynamic";

const ProductCatalog = dynamic(() => import("@/components/Storefront"), { ssr: false });

export default function ProductsPage() {
  return <ProductCatalog />;
}
