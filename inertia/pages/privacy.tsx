import { css } from '#style/css'
import { VStack } from '#style/jsx'
import { Head } from '@inertiajs/react'
import { Heading } from '#ui/components/ui/heading'

const Privacy = () => {
  return (
    <>
      <Head title="Vie privée" />
      <VStack
        height={'100'}
        minH={'100vh'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        marginBlock={'2.5'}
      >
        <div className={css({ maxWidth: '4/5' })}>
          <Heading size={'lg'} marginBlock={'3.5'}>
            Politique de Confidentialité pour l'application <em>Influmation</em>
          </Heading>
          <p>
            Chez <em>Influmation</em>, nous attachons une grande importance à la confidentialité de
            vos données. Cette politique de confidentialité explique quelles informations nous
            collectons, comment nous les utilisons et quels sont vos droits concernant vos données
            personnelles lorsque vous utilisez notre application.
          </p>
          <Heading as={'h2'} marginBlock={'3.5'}>
            1. Données collectées via l’API Instagram
          </Heading>
          <p>
            L'application <em>Influmation</em> accède aux données suivantes via l'API d'Instagram,
            avec votre autorisation explicite : les publications (contenu, images, vidéos), les
            commentaires sur vos publications ou interactions, et le contenu des messages privés.
          </p>
          <Heading as={'h2'} marginBlock={'3.5'}>
            2. Comment utilisons-nous vos données ?
          </Heading>
          <p>
            Les données collectées sont utilisées pour fournir les fonctionnalités principales de
            l’application, améliorer votre expérience utilisateur et résoudre les problèmes
            techniques ou répondre à vos demandes de support.
          </p>
          <p>
            Nous ne vendons, partageons ou divulguons pas vos données à des tiers non autorisés.
          </p>
          <Heading as={'h2'} marginBlock={'3.5'}>
            3. Stockage et sécurisation des données
          </Heading>
          <p>
            Certaines informations collectées sont stockées dans notre base de données de manière
            sécurisée. Nous utilisons des technologies modernes pour protéger ces données contre
            tout accès non autorisé, y compris des mesures de chiffrement et des systèmes de
            contrôle d’accès stricts.
          </p>
          <p>
            Toutes les communications entre l’application et les serveurs d’Instagram sont également
            chiffrées. Les données sensibles ne sont pas stockées localement sur votre appareil.
          </p>
          <Heading as={'h2'} marginBlock={'3.5'}>
            4. Conservation des données
          </Heading>
          <p>
            Vos données sont conservées uniquement le temps nécessaire pour atteindre les objectifs
            définis dans cette politique. Après cette période, elles sont supprimées ou anonymisées.
          </p>
          <Heading as={'h2'} marginBlock={'3.5'}>
            5. Vos droits
          </Heading>
          <p>
            Vous avez le droit d’accéder à vos données, de demander leur rectification si elles sont
            inexactes ou incomplètes, et de demander leur suppression à tous moment.
          </p>
        </div>
      </VStack>
    </>
  )
}

export default Privacy
