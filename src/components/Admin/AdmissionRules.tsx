import { useEffect, useState } from 'react';
import { RequirementList, Condition, Rule } from "../../types/course.types";
interface RuleBuilderProps {
  requirementList: RequirementList[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  rules: Rule[];
}

export default function RuleBuilder({requirementList, setRules, rules}: RuleBuilderProps) {
  const [examTypeList, setExamTypeList] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<number | null>(null);

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

  const deleteRule = (ruleIndex: number) => {
    const newRules = [...rules];
    newRules.splice(ruleIndex, 1);
    setRules(newRules);
    
    // If we're deleting the rule we're currently editing, exit edit mode
    if (editMode === ruleIndex) {
      setEditMode(null);
    } else if (editMode !== null && editMode > ruleIndex) {
      // Adjust editMode index if we're deleting a rule before the one we're editing
      setEditMode(editMode - 1);
    }
  };

  const deleteCondition = (ruleIndex: number, condIndex: number) => {
    // Don't allow deletion if it's the only condition
    if (rules[ruleIndex].conditions.length <= 1) return;
    
    const newRules = [...rules];
    newRules[ruleIndex].conditions.splice(condIndex, 1);
    setRules(newRules);
  };

  const toggleEditMode = (ruleIndex: number) => {
    setEditMode(editMode === ruleIndex ? null : ruleIndex);
  };

  useEffect(() => {
    let temList = requirementList.map((req) => req.examType)
    setExamTypeList(temList);
  }, [requirementList])

  return (
    <div className="space-y-4 bg-[#FAFAFA] p-4 rounded-xl border-[1px] border-[#E0E0E0] mt-10">
      <div className="flex justify-between items-center">
        <p className="text-[18px] font-semibold text-[#1E1E1E]">Admission Rules</p>
        <button
          className="px-4 py-2 bg-[#004085] text-white rounded shadow flex items-center"
          onClick={addRule}
        >
          <span className="mr-1">+</span> Add Rule
        </button>
      </div>
      
      {rules.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No rules defined yet. Click "Add Rule" to create one.
        </div>
      ) : (
        rules.map((rule, ruleIndex) => {
          const usedExamTypes = rule.conditions.map(c => c.examType);
          const isEditing = editMode === ruleIndex;

          return (
            <div key={ruleIndex} className="p-4 border rounded-xl space-y-2 bg-white shadow">
              <div className="flex justify-between items-center mb-2">
                {isEditing ? (
                  <input
                    className="w-[300px] p-2 border rounded"
                    placeholder="Rule name"
                    value={rule.ruleName}
                    onChange={(e) => updateRuleName(ruleIndex, e.target.value)}
                  />
                ) : (
                  <h3 className="font-medium text-lg">{rule.ruleName || "Unnamed Rule"}</h3>
                )}
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded ${isEditing ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => toggleEditMode(ruleIndex)}
                  >
                    {isEditing ? 'Done' : 'Edit'}
                  </button>
                  <button
                    className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    onClick={() => deleteRule(ruleIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {isEditing ? (
                <>
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
                        className="p-2 border rounded flex-grow"
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
                      
                      <button
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        onClick={() => deleteCondition(ruleIndex, condIndex)}
                        disabled={rule.conditions.length <= 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="text-blue-500 underline mt-2"
                    onClick={() => addCondition(ruleIndex)}
                  >
                    Add Condition
                  </button>
                </>
              ) : (
                <div className="mt-2">
                  {rule.conditions.map((condition, condIndex) => (
                    <div key={condIndex} className="flex items-center py-1">
                      {condIndex > 0 && (
                        <span className="px-2 text-gray-500">{condition.operator === "+" ? "+" : "or"}</span>
                      )}
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                        {condition.examType || "No exam type selected"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
