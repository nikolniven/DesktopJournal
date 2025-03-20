import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TabsCard from '../../components/TabsCard/TabsCard';
import ReflectionForm from '../../components/ReflectionForm/ReflectionForm';

function ReflectionPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  ///
  const [selectedMoods, setSelectedMoods] = useState({
    moodCategoryId: null,
    moodExtensiveId: null,
  });

  ///
  const handleMoodSelection = (moods) => {
    console.log('Mood selected:', moods);
    setSelectedMoods(moods);
  };

  useEffect(() => {
    console.log('selectedMoods updated in ReflectionPage:', selectedMoods);
  }, [selectedMoods]);

  if (!isLoggedIn) {
    return navigate('/login');
  }

  return (
    <div className="flex flex-col lg:flex-row mt-[10vh] px-4 lg:px-100 space-y-8 lg:space-y-0 lg:space-x-20 w-full max-w-screen-lg mx-auto">
      <ReflectionForm selectedMoods={selectedMoods} />
      <div className="flex flex-col items-center space-y-6">
        <TabsCard onMoodSelection={handleMoodSelection} />
      </div>
    </div>
  );
}

export default ReflectionPage;
