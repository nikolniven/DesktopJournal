import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TabsCard from '../../components/TabsCard/TabsCard';
import ReflectionForm from '../../components/ReflectionForm/ReflectionForm';
import axios from 'axios';

function ReflectionPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem('authToken');
  const [categories, setCategories] = useState({});

  useEffect(() => {
    getAllMoods();
  }, []);

  const getAllMoods = async () => {
    const avaialbleMoods = await axios.get(`${baseURL}/moods/extensive`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    let categoriesNames = [
      ...new Set(avaialbleMoods.data.map((mood) => mood.moodCategoryId.name)),
    ];
    const categoriesData = {};

    for (const category of categoriesNames) {
      categoriesData[category] = [];
    }

    avaialbleMoods.data.forEach((e) => {
      categoriesData[e.moodCategoryId.name].push(e);
    });

    setCategories(categoriesData);
  };

  ///
  const [selectedMoods, setSelectedMoods] = useState({
    moodCategoryId: null,
    moodExtensiveId: null,
  });

  ///
  const handleMoodSelection = (moods) => {
    // console.log('Mood selected:', moods);
    setSelectedMoods(moods);
  };

  // useEffect(() => {
  //   console.log('selectedMoods updated in ReflectionPage:', selectedMoods);
  // }, [selectedMoods]);

  if (!isLoggedIn) {
    return navigate('/login');
  }

  return (
    <div className="flex flex-col lg:flex-row mt-[10vh] px-4 lg:px-100 space-y-8 lg:space-y-0 lg:space-x-20 w-full max-w-screen-lg mx-auto">
      <ReflectionForm selectedMoods={selectedMoods} />
      <div className="flex flex-col items-center space-y-6">
        <TabsCard
          categories={categories}
          onMoodSelection={handleMoodSelection}
        />
      </div>
    </div>
  );
}

export default ReflectionPage;
