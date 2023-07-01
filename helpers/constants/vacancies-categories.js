const CATEGORY_LIST = Object.freeze({
  all: "all-vacancies",
  irrelevant: "irrelevant-vacancies",
  actual: "actual-vacancies",
});

const NOTICE_CATEGORIES = Object.values(CATEGORY_LIST);

module.exports = {
  CATEGORY_LIST,
  NOTICE_CATEGORIES,
};
