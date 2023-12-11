import Blockies from 'react-blockies';

const BlockiesIcon = ({ walletAddress, size, ...props }: any) => {
  const _size = parseFloat((size / 4).toString());
  return (
    <Blockies
      seed={walletAddress} //{/* the only required prop; determines how the image is generated */}
      size={4} //{/* number of squares wide/tall the image will be; default = 15 */}
      scale={_size} //{/* width/height of each square in pixels; default = 4 */}
      // color='bg-[var(--color-icon-brand)]' //{/* normal color; random by default */}
      // bgColor='#ffe' //{/* background color; random by default */}
      // spotColor='#abc' //{/* color of the more notable features; random by default */}
      className={`${props.className ? props.className : ''}`} //{/* optional class name for the canvas element; "identicon" by default */}
    />
  );
};
export default BlockiesIcon;
