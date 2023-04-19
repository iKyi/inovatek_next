import { NextPage } from "next";
import NuExistaRezultate from "@/components/reusable/NuExistaRezultate";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";

type PatruSutePatruProps = {};

const PatruSutePatru: NextPage<PatruSutePatruProps> = () => {
  return (
    <LayoutWrapper seo={{
      metaTitle: 'Pagina nu a putut fi gasita'
    }}>
      <NuExistaRezultate />
    </LayoutWrapper>
  );
};

export default PatruSutePatru;
