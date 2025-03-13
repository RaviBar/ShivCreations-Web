import {AdditionalServiceDetail} from '../../components/AdditionalServiceDetail';

interface AdditionalServiceDetailProps {
  params: {
    slug: string;
  };
}
export default async function Page({ params }: AdditionalServiceDetailProps) {
  const { slug } = params;

  return <AdditionalServiceDetail slug={slug} />;
}
