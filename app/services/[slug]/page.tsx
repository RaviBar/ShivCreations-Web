import ServiceDetail from '@/app/components/ServiceDetail';

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: ServiceDetailProps) {
  const { slug } = params;

  return <ServiceDetail slug={slug} />;
}