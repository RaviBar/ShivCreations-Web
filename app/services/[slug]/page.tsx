import ServiceDetail from '@/app/components/ServiceDetail';

export default async function Page({ 
  params,
 }: {
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  // console.log("Params:", params);
  // console.log("Slug:", slug);
  return <ServiceDetail slug={slug} />;
}