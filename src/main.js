const coursesData = [
  {
    title: 'JavaScript Basics',
    price: 1200,
    students: 20,
    isActive: true,
  },
  {
    title: 'HTML & CSS',
    price: 900,
    students: 25,
    isActive: true,
  },
  {
    title: 'React Start',
    price: 1800,
    students: 0,
    isActive: false,
  },
];

const getActiveCourses = courses => courses.filter(course => course.isActive);
console.log(getActiveCourses(coursesData));
// [
//   {
//     title: 'JavaScript Basics',
//     price: 1200,
//     students: 20,
//     isActive: true
//   },
//   {
//     title: 'HTML & CSS',
//     price: 900,
//     students: 25,
//     isActive: true
//   }
// ]
/*Створіть функцію createCoursesOverview(courses). Спочатку вона повинна отримати активні курси через getActiveCourses() з першого етапу.



Поверніть об’єкт із властивостями:

titles — масив рядків активних курсів у форматі HTML & CSS — 900 грн. Перед форматуванням відсортуйте новий масив курсів за зростанням ціни;
totalStudents — загальна кількість студентів на активних курсах, обчислена через reduce();
allHaveStudents — результат перевірки, чи всі активні курси мають хоча б одного студента;
hasFreeCourse — результат перевірки, чи є серед активних курсів безплатний курс, тобто його ціна = 0.
*/
const createCoursesOverview = courses => {
  const activeCourses = getActiveCourses(courses);
  const titles = activeCourses
    .toSorted((a, b) => a.price - b.price)
    .map(course => `${course.title} — ${course.price} грн.`);
  const totalStudents = activeCourses.reduce(
    (acc, course) => acc + course.students,
    0
  );
  const allHaveStudents = activeCourses.every(course => course.students > 0);
  const hasFreeCourse = activeCourses.some(course => course.price === 0);
  return { titles, totalStudents, allHaveStudents, hasFreeCourse };
};

console.log(createCoursesOverview(coursesData));
// {
//   titles: ['HTML & CSS — 900 грн', 'JavaScript Basics — 1200 грн'],
//   totalStudents: 45,
//   allHaveStudents: true,
//   hasFreeCourse: false
// }
class Course {
  #students;

  constructor(courseInfo) {
    this.title = courseInfo.title;
    this.price = courseInfo.price;
    this.#students = courseInfo.students;
  }

  enrollStudent() {
    this.#students += 1;
  }

  getStudentsCount() {
    return this.#students;
  }

  getInfo() {
    return `${this.title}: ${this.#students} студентів, ${this.price} грн`;
  }
}

const course = new Course({
  title: 'JavaScript Basics',
  price: 1200,
  students: 20,
});

course.enrollStudent();

console.log(course.getStudentsCount());

console.log(course.getInfo());

// Створіть клас CourseCatalog. Його конструктор отримує масив courses.

// Клас повинен містити приватну властивість #courses.

// У конструкторі:

// отримайте активні курси за допомогою getActiveCourses();
// перетворіть їх через map() на екземпляри класу Course;
// збережіть отриманий масив у #courses.

// Додайте методи:

// addCourse(course) — додає готовий екземпляр курсу до каталогу;
// findCourse(title) — знаходить курс за точною назвою через find() і повертає його або null;
// getTotalPotentialIncome() — через reduce() повертає загальну потенційну суму: price * кількість студентів для кожного курсу.

class CourseCatalog {
  #courses;
  constructor(courses) {
    this.#courses = getActiveCourses(courses).map(course => new Course(course));
  }
  addCourse(course) {
    this.#courses.push(course);
  }

  findCourse(title) {
    return this.#courses.find(course => course.title === title) || null;
  }

  getTotalPotentialIncome() {
    return this.#courses.reduce(
      (acc, course) => acc + course.price * course.getStudentsCount(),
      0
    );
  }
}

const catalog = new CourseCatalog(coursesData);

console.log(catalog.findCourse('HTML & CSS').getInfo());
// HTML & CSS: 25 студентів, 900 грн

console.log(catalog.getTotalPotentialIncome()); // 46500
