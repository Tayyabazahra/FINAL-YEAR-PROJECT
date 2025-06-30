import { Button } from "../../../../../generalComponents";
import HeroLight from "../../../../../assets/images/landing/hero-light.png";
import HeroDark from "../../../../../assets/images/landing/hero-dark.png";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <header
      id="home"
      className="max-w-[1110px] mx-auto flex flex-col mt-12 md:mt-24 px-4 lg:px-0"
    >
      <div className="flex-1 flex flex-col gap-4 md:gap-6 max-w-xl items-center mx-auto text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-text">
            <FormattedMessage id="LANDING.HERO_TITLE" />
          </h1>
          <p className="text-secondary-text">
            <FormattedMessage id="LANDING.HERO_DESCRIPTION" />
          </p>
        </div>
        <div>
          <Link to={"/register"}>
            <Button label={<FormattedMessage id="LANDING.HERO_BUTTON" />} />
          </Link>
        </div>
      </div>

      <div className="flex-1 rounded-2xl md:rounded-[48px] border max-w-5xl mt-6 md:mt-12 mx-auto border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-neutral-900 overflow-hidden">
        <div>
          <img
            src={HeroLight}
            alt="Hero Light Version"
            className="dark:hidden"
          />
          <img
            src={HeroDark}
            alt="Hero Dark Version"
            className="hidden dark:block"
          />
        </div>
      </div>
    </header>
  );
};
