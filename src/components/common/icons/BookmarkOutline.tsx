import BookmarkOutlineSVGIcon from '@public/svg/icons/icon_bookmark_outline.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
  active?: boolean;
}
export default function BookmarkOutline({ size, color }: IconProps) {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <BookmarkOutlineSVGIcon width={width} height={height} fill={fill} />;
}
