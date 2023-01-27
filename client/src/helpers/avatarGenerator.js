export const avatarGen = (avatar) => {
  if (avatar?.facialHair) {
    return `style=${avatar?.avatarStyle}&top=${avatar?.top}&accessories=${avatar?.accessories}&hairColor=${avatar?.hairColor}&facialHair=${avatar?.facialHair}&clothes=${avatar?.clothes}&eyes=${avatar?.eyes}&eyebrow=${avatar?.eyebrow}&mouth=${avatar?.mouth}&skin=${avatar?.skin}`;
  } else {
    return `style=${avatar?.avatarStyle}&top=${avatar?.top}&accessories=${avatar?.accessories}&hairColor=${avatar?.hairColor}&clothes=${avatar?.clothes}&eyes=${avatar?.eyes}&eyebrow=${avatar?.eyebrow}&mouth=${avatar?.mouth}&skin=${avatar?.skin}`;
  }
};
