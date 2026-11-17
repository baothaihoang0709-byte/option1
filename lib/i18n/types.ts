export type Language = "en" | "vi";

export interface TranslationDictionary {
  common: {
    skipToContent: string;
    header: {
      nav: {
        home: string;
        about: string;
        services: string;
        contact: string;
      };
      cta: string;
      languageSwitcherAria: string;
      mobileMenuOpenAria: string;
      mobileMenuCloseAria: string;
      mobileLangLabel: string;
    };
    footer: {
      tagline: string;
      subtitle: string;
      navHeading: string;
      corporateHeading: string;
      registeredInSingapore: string;
      corporateDesc: string;
      inquiriesHeading: string;
      inquiriesDesc: string;
      inquiriesLink: string;
      inquiriesNote: string;
      copyright: string;
      entityLine: string;
    };
  };
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      competenciesTitle: string;
      tag1: string;
      tag2: string;
      tag3: string;
      tag4: string;
      visual: {
        statusTitle: string;
        statusBadge: string;
        metric1Label: string;
        metric1Value: string;
        metric2Label: string;
        metric2Value: string;
        metric3Label: string;
        metric3Value: string;
        badgeRoiTitle: string;
        badgeRoiSub: string;
        badgeSatTitle: string;
        badgeSatSub: string;
      };
    };
    valuePillars: {
      badge: string;
      title: string;
      subtitle: string;
      pillar1: {
        title: string;
        tag: string;
        body: string;
        linkText: string;
      };
      pillar2: {
        title: string;
        tag: string;
        body: string;
        linkText: string;
      };
      pillar3: {
        title: string;
        tag: string;
        body: string;
        linkText: string;
      };
    };
    servicesOverview: {
      badge: string;
      title: string;
      subtitle: string;
      highlightsTitle: string;
      catalogButton: string;
      group1: {
        badge: string;
        title: string;
        subtitle: string;
        description: string;
        items: string[];
        linkText: string;
      };
      group2: {
        badge: string;
        title: string;
        subtitle: string;
        description: string;
        items: string[];
        linkText: string;
      };
    };
    methodology: {
      badge: string;
      title: string;
      subtitle: string;
      supportLink: string;
      step1: {
        title: string;
        subtitle: string;
        description: string;
      };
      step2: {
        title: string;
        subtitle: string;
        description: string;
      };
      step3: {
        title: string;
        subtitle: string;
        description: string;
      };
      step4: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    conversionCta: {
      pill: string;
      title: string;
      tagline: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      assurance: string;
    };
  };
  about: {
    hero: {
      breadcrumbHome: string;
      breadcrumbCurrent: string;
      badge: string;
      title: string;
      tagline: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      fact1Label: string;
      fact1Value: string;
      fact2Label: string;
      fact2Value: string;
      fact3Label: string;
      fact3Value: string;
      fact4Label: string;
      fact4Value: string;
    };
    corporateProfile: {
      badge: string;
      title: string;
      p1: string;
      p2: string;
      p3: string;
      principle1Title: string;
      principle1Desc: string;
      principle2Title: string;
      principle2Desc: string;
      cardTitle: string;
      cardSubtitle: string;
      cardVerifiedBadge: string;
      entityLabel: string;
      locationLabel: string;
      scopeLabel: string;
      scopeValue: string;
      inquiriesLabel: string;
      inquiriesValue: string;
      cardButton: string;
    };
    customerCommitment: {
      badge: string;
      title: string;
      subtitle: string;
      promiseTitle: string;
      promiseSubtitle: string;
      quote: string;
      quoteAuthor: string;
      dim1Title: string;
      dim1Desc: string;
      dim2Title: string;
      dim2Desc: string;
      dim3Title: string;
      dim3Desc: string;
    };
    technicalStrengths: {
      badge: string;
      title: string;
      subtitle: string;
      strength1: {
        badge: string;
        title: string;
        desc: string;
        items: string[];
        link: string;
      };
      strength2: {
        badge: string;
        title: string;
        desc: string;
        items: string[];
        link: string;
      };
      strength3: {
        badge: string;
        title: string;
        desc: string;
        items: string[];
        link: string;
      };
    };
    partnershipCta: {
      pill: string;
      title: string;
      tagline: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      assurance: string;
    };
  };
  services: {
    hero: {
      breadcrumbHome: string;
      breadcrumbCurrent: string;
      badge: string;
      title: string;
      tagline: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      cap1Label: string;
      cap1Value: string;
      cap2Label: string;
      cap2Value: string;
      cap3Label: string;
      cap3Value: string;
      cap4Label: string;
      cap4Value: string;
    };
    techSupport: {
      badge: string;
      title: string;
      subtitle: string;
      scopeTitle: string;
      domain1: {
        badge: string;
        title: string;
        desc: string;
        items: string[];
        linkText: string;
      };
      domain2: {
        badge: string;
        title: string;
        desc: string;
        items: string[];
        linkText: string;
      };
      domain3: {
        badge: string;
        title: string;
        desc: string;
        items: string[];
        linkText: string;
      };
      bannerTitle: string;
      bannerDesc: string;
      bannerButton: string;
    };
    itOutsourcing: {
      badge: string;
      title: string;
      tagline: string;
      quote: string;
      quoteAuthor: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      b1Title: string;
      b1Desc: string;
      b2Title: string;
      b2Desc: string;
      b3Title: string;
      b3Desc: string;
      b4Title: string;
      b4Desc: string;
    };
    valueComparison: {
      badge: string;
      title: string;
      subtitle: string;
      tableHeaderAspect: string;
      tableHeaderInHouse: string;
      tableHeaderOutsource: string;
      row1Dimension: string;
      row1InHouse: string;
      row1Outsource: string;
      row1Badge: string;
      row2Dimension: string;
      row2InHouse: string;
      row2Outsource: string;
      row2Badge: string;
      row3Dimension: string;
      row3InHouse: string;
      row3Outsource: string;
      row3Badge: string;
      row4Dimension: string;
      row4InHouse: string;
      row4Outsource: string;
      row4Badge: string;
      disclaimerPrefix: string;
      disclaimerText: string;
    };
    faq: {
      badge: string;
      title: string;
      subtitle: string;
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
    };
    servicesCta: {
      pill: string;
      title: string;
      tagline: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      assurance: string;
    };
  };
  contact: {
    hero: {
      breadcrumbHome: string;
      breadcrumbCurrent: string;
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    contactInfo: {
      cardTitle: string;
      cardSub: string;
      verifiedBadge: string;
      entityLabel: string;
      entityName: string;
      locationLabel: string;
      locationValue: string;
      focusLabel: string;
      focusValue: string;
      inviteHeading: string;
      inviteText: string;
      noticeTitle: string;
      noticeText: string;
      commitmentTitle: string;
      commitmentText: string;
    };
    contactForm: {
      badge: string;
      title: string;
      subtitle: string;
      labelFullName: string;
      labelEmail: string;
      labelCompany: string;
      labelCompanyOptional: string;
      labelService: string;
      labelMessage: string;
      placeholderName: string;
      placeholderEmail: string;
      placeholderCompany: string;
      placeholderMessage: string;
      serviceOpt1: string;
      serviceOpt2: string;
      serviceOpt3: string;
      errorRequiredName: string;
      errorNameLength: string;
      errorRequiredEmail: string;
      errorEmailFormat: string;
      errorRequiredMessage: string;
      errorMessageLength: string;
      bannerSuccessTitle: string;
      bannerSuccessDesc: string;
      bannerPendingTitle: string;
      bannerPendingDesc: string;
      buttonReset: string;
      privacyNotice: string;
      buttonSubmit: string;
      buttonSubmitDemo: string;
      footerAssurance: string;
    };
    whatHappensNext: {
      badge: string;
      title: string;
      subtitle: string;
      footerNote: string;
      step1: {
        title: string;
        subtitle: string;
        description: string;
      };
      step2: {
        title: string;
        subtitle: string;
        description: string;
      };
      step3: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    closingCta: {
      pill: string;
      title: string;
      tagline: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      assurance: string;
    };
  };
}
