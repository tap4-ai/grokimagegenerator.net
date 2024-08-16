import Anime from '../svg/navigation/Anime';
// import Girl from '../svg/navigation/Girl';
import Medal from '../svg/navigation/Medal';
import Sticker from '../svg/navigation/Sticker';
import Text2Image from '../svg/navigation/Text2Image';

export default function RenderIcon(code: string) {
  switch (code) {
    case 'flux-ai-image-generator':
      return <Text2Image />;
    case 'flux-ai-sticker-generator':
      return <Sticker />;
    case 'flux-ai-medal-generator':
      return <Medal />;
    case 'flux-ai-anime-generator':
      return <Anime />;

    default:
      return null;
  }
}
