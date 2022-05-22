import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    pet_name,
    pet_status,
    pet_type,
    pet_color,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    petStatusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search the pet :)</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="pet_name"
            labelText="name"
            value={pet_name}
            handleChange={handleSearch}
          />
          {/* <FormRow
            type="text"
            name="pet_type"
            labelText="type of animal"
            value={pet_type}
            handleChange={handleSearch}
          /> */}

          <FormRowSelect
            labelText="status"
            name="pet_status"
            value={pet_status}
            handleChange={handleSearch}
            list={["All", ...petStatusOptions]}
          />
          {/* <FormRow
            type="text"
            name="pet_color"
            labelText="color"
            value={pet_color}
            handleChange={handleSearch}
          /> */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
