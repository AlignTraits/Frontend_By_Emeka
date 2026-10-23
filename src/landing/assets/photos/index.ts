import type { ResponsiveImage } from '../../data/types.ts';

import parent576 from './parent-and-student-576.webp';
import parent800 from './parent-and-student-800.webp';
import parent1200 from './parent-and-student-1200.webp';
import leaver264 from './school-leaver-264.webp';
import leaver528 from './school-leaver-528.webp';
import student265 from './student-at-desk-265.webp';
import student530 from './student-at-desk-530.webp';

/** Photos from the design, exported as WebP at 1x and 2x of the width they are shown at. */
export const parentAndStudentPhoto: ResponsiveImage = {
  src: parent800,
  srcSet: `${parent576} 576w, ${parent800} 800w, ${parent1200} 1200w`,
  width: 1200,
  height: 896,
};

/** Already cropped to the frame shape (265:602). */
export const schoolLeaverPhoto: ResponsiveImage = {
  src: leaver528,
  srcSet: `${leaver264} 264w, ${leaver528} 528w`,
  width: 528,
  height: 1200,
};

export const studentAtDeskPhoto: ResponsiveImage = {
  src: student530,
  srcSet: `${student265} 265w, ${student530} 530w`,
  width: 530,
  height: 658,
};
