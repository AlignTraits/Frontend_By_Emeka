import { useEffect, useState } from 'react';
import { RequirementList, Condition, Rule } from "../../types/course.types";

// const examTypeList = ['WAEC', 'NECO', 'GCE', 'JAMB', 'UTME', 'A_LEVEL', 'NABTEB'];

// interface Condition {
//   examType: string;
//   operator: 'or' | '+';
// }

// interface Rule {
//   ruleName: string;
//   conditions: Condition[];
// }

interface RuleBuilderProps {
  requirementList: RequirementList[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>
  rules: Rule[]
}

export default function RuleBuilder({requirementList, setRules, rules}: RuleBuilderProps) {
  // console.log("requirementList: ", requirementList);

  const [examTypeList, setExamTypeList] = useState<string[]>([]);

  const addRule = () => {
    setRules([...rules, { ruleName: '', conditions: [{ examType: '', operator: 'or' }] }]);
  };

  const updateRuleName = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index].ruleName = value;
    setRules(newRules);
  };

  const updateCondition = (ruleIndex: number, condIndex: number, key: keyof Condition, value: string) => {
    const newRules = [...rules];
    newRules[ruleIndex].conditions[condIndex][key] = value as any;
    setRules(newRules);
  };

  const addCondition = (ruleIndex: number) => {
    const usedExamTypes = rules[ruleIndex].conditions.map(c => c.examType);
    const remainingExamTypes = examTypeList.filter(e => !usedExamTypes.includes(e));
    if (remainingExamTypes.length === 0) return;
    const newCondition: Condition = {
      examType: remainingExamTypes[0],
      operator: '+',
    };
    const newRules = [...rules];
    newRules[ruleIndex].conditions.push(newCondition);
    setRules(newRules);
  };

  useEffect(() => {
    let temList = requirementList.map((req) => req.examType)
    setExamTypeList(temList);
  }, [requirementList])

  return (
    <div className="space-y-4  bg-[#FAFAFA] p-4 rounded-xl border-[1px] border-[#E0E0E0] mt-10">
      <p className="text-[18px] font-semibold text-[#1E1E1E]">Admission Rules</p>
      {rules.map((rule, ruleIndex) => {
        const usedExamTypes = rule.conditions.map(c => c.examType);

        return (
          <div key={ruleIndex} className="p-4 border rounded-xl space-y-2 bg-white shadow">
            <input
              className="w-full p-2 border rounded"
              placeholder="Rule name"
              value={rule.ruleName}
              onChange={(e) => updateRuleName(ruleIndex, e.target.value)}
            />
            {rule.conditions.map((condition, condIndex) => (
              <div key={condIndex} className="flex items-center space-x-2">
                {condIndex > 0 && (
                  <select
                    className="p-2 border rounded"
                    value={condition.operator}
                    onChange={(e) => updateCondition(ruleIndex, condIndex, 'operator', e.target.value)}
                  >
                    <option value="or">or</option>
                    <option value="+">+</option>
                  </select>
                )}
                <select
                  className="p-2 border rounded"
                  value={condition.examType}
                  onChange={(e) => updateCondition(ruleIndex, condIndex, 'examType', e.target.value)}
                >
                  <option value="" disabled>Select exam type</option>
                  {examTypeList
                    .filter(e => e === condition.examType || !usedExamTypes.includes(e))
                    .map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                </select>
              </div>
            ))}
            <button
              className="text-blue-500 underline mt-2"
              onClick={() => addCondition(ruleIndex)}
            >
              Add Condition
            </button>
          </div>
        );
      })}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={addRule}
      >
        Add Rule
      </button>
    </div>
  );
}
