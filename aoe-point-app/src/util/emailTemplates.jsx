import { categories } from "./miscUtil";

export function PointTable(student) {
  <div className="overflow-x-auto mb-6">
    <table className="w-full border-collapse border border-gray-400">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-400 px-4 py-2 text-center">
            Point Category
          </th>
          <th className="border border-gray-400 px-4 py-2 text-center">
            Point Requirement
          </th>
          <th className="border border-gray-400 px-4 py-2 text-center">
            Points Earned* (currently)
          </th>
          <th className="border border-gray-400 px-4 py-2 text-center">
            Points Needed
          </th>
          <th className="border border-gray-400 px-4 py-2 text-center">
            Excuses
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category} className="hover:bg-gray-50">
            <td className="border border-gray-400 px-4 py-2 text-center">
              {category}
            </td>
            <td className="border border-gray-400 px-4 py-2 text-center">
              ** Do requirements later
            </td>
            <td className="border border-gray-400 px-4 py-2 text-center">
              {student[`${category} Current Points`]}
            </td>
            <td className="border border-gray-400 px-4 py-2 text-center">
              ** Do after requirements
            </td>
            <td className="border border-gray-400 px-4 py-2 text-center">
              {student[`${category} Excuses`]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}

export function MidSemesterEmailTemplate(student) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <p className="mb-4">Hello {student["Student"]},</p>
        <p className="mb-4">
          Below is a summary of your current point status in each category:
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <p>*points earned includes bonus points</p>
        <p>
          **academic point of 1 means you have earned all 15, check GCM for your
          current total
        </p>

        <p className="mt-4">
          Please keep this in mind for the final point check at the end of the
          semester:
        </p>

        <p>
          In order for a category to count as excused,{" "}
          <strong>
            the number of points earned + the number of events excused must
            equal the total number of events hosted.
          </strong>{" "}
          For example, there were 4 professional events. To reach the point
          requirement, you had to attend 3 of these events. If you only attended
          2 events, you would need to have submitted excuses for the other 2
          events in order to excuse this category.
        </p>

        <p className="mt-4">
          If you have any questions, please feel free to email (
          <a
            href="mailto:jmuaoesecretary@gmail.com"
            className="text-blue-600 underline"
          >
            jmuaoesecretary@gmail.com
          </a>
          ) or text me (831) 324-8536.
        </p>

        <p className="mt-4">Best,</p>
        <div className="mt-2">
          <p>Emily Euler (she/her), Secretary</p>
          <p>Gamma Alpha Chapter of Alpha Omega Epsilon</p>
        </div>
      </div>
    </div>
  );
}
