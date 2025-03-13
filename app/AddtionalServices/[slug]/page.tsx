import AdditionalServiceDetail from '../../components/AdditionalServiceDetail';


export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  console.log("Params:", params);
  console.log("Slug:", slug);

  return <AdditionalServiceDetail slug={slug} />;
}
