import AdditionalServiceDetail from '../../components/AdditionalServiceDetail';


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <AdditionalServiceDetail slug={slug} />;
}


// type tParams = Promise<{ slug: string }>;
// export default async function Page(props: { params: tParams }) {
//   const { slug } = await props.params;
//   console.log("Params:", props);
//   console.log("Slug:", slug);
//   return <AdditionalServiceDetail slug={slug} />;
// }
