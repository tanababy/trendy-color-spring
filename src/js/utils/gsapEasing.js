import CustomEase from "./CustomEase";

export default function gsapEasing() {

  CustomEase.create("linear", "0.250, 0.250, 0.750, 0.750");
  CustomEase.create("ease", "0.250, 0.100, 0.250, 1.000");
  CustomEase.create("easeIn", "0.420, 0.000, 1.000, 1.000");
  CustomEase.create("easeOut", "0.000, 0.000, 0.580, 1.000");
  CustomEase.create("easeInOut", "0.420, 0.000, 0.580, 1.000");
  CustomEase.create("easeInQuad", "0.550, 0.085, 0.680, 0.530");
  CustomEase.create("easeInCubic", "0.550, 0.055, 0.675, 0.190");
  CustomEase.create("easeInQuart", "0.895, 0.030, 0.685, 0.220");
  CustomEase.create("easeInQuint", "0.755, 0.050, 0.855, 0.060");
  CustomEase.create("easeInSine", "0.470, 0.000, 0.745, 0.715");
  CustomEase.create("easeInExpo", "0.950, 0.050, 0.795, 0.035");
  CustomEase.create("easeInCirc", "0.600, 0.040, 0.980, 0.335");
  CustomEase.create("easeInBack", ".600, -0.280, 0.735, 0.045");
  CustomEase.create("easeOutQuad", "0.250, 0.460, 0.450, 0.940");
  CustomEase.create("easeOutCubic", "0.215, 0.610, 0.355, 1.000");
  CustomEase.create("easeOutQuart", "0.165, 0.840, 0.440, 1.000");
  CustomEase.create("easeOutQuint", "0.230, 1.000, 0.320, 1.000");
  CustomEase.create("easeOutSine", "0.390, 0.575, 0.565, 1.000");
  CustomEase.create("easeOutExpo", "0.190, 1.000, 0.220, 1.000");
  CustomEase.create("easeOutCirc", "0.075, 0.820, 0.165, 1.000");
  CustomEase.create("easeOutBack", "0.175, 0.885, 0.320, 1.275");
  CustomEase.create("easeInOutQuad", "0.455, 0.030, 0.515, 0.955");
  CustomEase.create("easeInOutCubic", "0.645, 0.045, 0.355, 1.000");
  CustomEase.create("easeInOutQuart", "0.770, 0.000, 0.175, 1.000");
  CustomEase.create("easeInOutQuint", "0.860, 0.000, 0.070, 1.000");
  CustomEase.create("easeInOutSine", "0.445, 0.050, 0.550, 0.950");
  CustomEase.create("easeInOutExpo", "1.000, 0.000, 0.000, 1.000");
  CustomEase.create("easeInOutCirc", "0.785, 0.135, 0.150, 0.860");
  CustomEase.create("easeInOutBack", ".680, -0.550, 0.265, 1.550");

}