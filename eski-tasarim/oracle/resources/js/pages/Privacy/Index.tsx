import { Head } from '@inertiajs/react';
import { Icon } from '@/components/shared/icon';
import { PageHeader } from '@/components/shared/PageHeader';
import { PublicLayout } from '@/layouts/PublicLayout';

export default function PrivacyPage({ privacy, page, error }) {
  const { t } = useTranslation();

  // Error State
  if (error || !privacy) {
    return (
      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title={page?.title}
            subtitle={page?.description}
            icon={page?.icon ? <Icon name={page.icon} className="w-8 h-8" /> : undefined}
          />
          <div className="mt-6">
            <p className="text-ko-text-muted text-center py-12">
              {t('components.coming_soon')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {page?.title && (
        <Head>
          <title>{page.title}</title>
          {page.description && <meta name="description" content={page.description} />}
        </Head>
      )}
      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <PageHeader
            title={page?.title}
            subtitle={page?.description}
            icon={page?.icon ? <Icon name={page.icon} className="w-8 h-8" /> : undefined}
          />

          <div className="bg-ko-card border border-ko-border-primary rounded-2xl p-6 md:p-8">
            <div className="prose prose-invert max-w-none">
              {privacy?.content ? (
                <div dangerouslySetInnerHTML={{ __html: privacy.content }} />
              ) : (
                <p className="text-ko-text-muted text-center py-12">
                  {t('components.coming_soon')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PrivacyPage.layout = (page) => <PublicLayout children={page} />;
