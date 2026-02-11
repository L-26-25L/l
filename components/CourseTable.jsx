useEffect(() => {
  const quizRows = rows.filter(r =>
    r.type.toLowerCase().includes("quiz")
  );

  const sorted = [...quizRows].sort((a, b) => b.obtained - a.obtained);

  const bestFour = sorted.slice(0, 4);

  const bestQuizTotal = bestFour.reduce((s, q) => s + q.obtained, 0);
  const quizPossibleTotal = bestFour.reduce((s, q) => s + q.total, 0);

  const excludedIndex = rows.findIndex(r => r === lowestQuiz);

  onMetricsChange?.({
    totalObtained,
    totalPossible,
    percentage,
    remainingForAPlus,
    remainingForA,

    // 🔥 أهم شيء للرسومات
    quizList: quizRows.map(q => ({
      name: q.type,
      obtained: q.obtained
    })),
    bestQuizTotal,
    quizPossibleTotal,
    excludedIndex
  });
}, [
  rows,
  lowestQuiz,
  totalObtained,
  totalPossible,
  percentage,
  remainingForAPlus,
  remainingForA,
  onMetricsChange
]);
