import AIcon from '../svg/landing-page/core/a';
import BIcon from '../svg/landing-page/core/b';
import CIcon from '../svg/landing-page/core/c';
import DIcon from '../svg/landing-page/core/d';
import EIcon from '../svg/landing-page/core/e';
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

export function RenderCoreIcon(code: string) {
  switch (code) {
    case '1':
      return <AIcon />;
    case '2':
      return <BIcon />;
    case '3':
      return <CIcon />;
    case '4':
      return <DIcon />;
    case '5':
      return <EIcon />;

    default:
      return null;
  }
}
