import siteMetadata from '@/utils/siteMetadata';
import Head from 'next/head';
import { useRouter } from 'next/router';
type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string | { name: string; url: string }[];
  twImage?: string;
  canonicalUrl?: string;
};
const SiteMetaData = (props: Props) => {
  const title = props.title || 'NFTBank.ai reboot';
  const description = props.description || 'NFTBank reboot';
  const keywords = props.keywords || 'NFTBank reboot';
  const ogType = props.ogType || 'website';
  const ogImage = props.ogImage || '/og-image.png';
  const twImage = props.twImage || '/og-image.png';
  const canonicalUrl = props.canonicalUrl || '';
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' href='/favicon.ico' />
      <meta property='og:url' content={`${siteMetadata.url}${router.asPath}`} />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content={siteMetadata.title} />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ name, url }) => (
          <meta property='og:image' content={url} key={name} />
        ))
      ) : (
        <meta property='og:image' content={ogImage} key={ogImage} />
      )}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={siteMetadata.twitter} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={twImage} />
      {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}
    </Head>
  );
};
export default SiteMetaData;
