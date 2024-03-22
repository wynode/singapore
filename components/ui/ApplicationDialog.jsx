import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
} from "@nextui-org/react";
import areaData from "./areaData";

const ApplicationDialog = ({ isLoading, isOpen, onOpenChange, onSubmit }) => {
  const formInit = {
    name: "",
    phone: "",
    base_info: "",
    province: "",
    city: "",
    district: "",
  };
  const [formData, setFormData] = React.useState({ ...formInit });

  const [cityList, setCityList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleProvinceChange = (e) => {
    let label = "";
    let cityListNew = [];
    areaData.forEach((item) => {
      if (item.value === e.target.value) {
        label = item.label;
        cityListNew = item.childs;
      }
    });
    setCityList(cityListNew);
    setDistrictList([]);
    handleChange("province", label);
    handleChange("city", "");
    handleChange("district", "");
  };

  const handleCityChange = (e) => {
    let label = "";
    let districtListNew = [];
    cityList.forEach((item) => {
      if (item.value === e.target.value) {
        label = item.label;
        districtListNew = item.childs;
      }
    });
    setDistrictList(districtListNew);
    handleChange("city", label);
    handleChange("district", "");
  };

  const handleDistrictChange = (e) => {
    let label = "";
    districtList.forEach((item) => {
      if (item.value === e.target.value) {
        label = item.label;
      }
    });
    handleChange("district", label);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ ...formInit });
    // onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3>提交申请</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                label="姓名"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                label="联系电话"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <Textarea
                label="基本情况"
                placeholder="请描述基本情况,如年龄、地域、需求等"
                value={formData.base_info}
                onChange={(e) => handleChange("base_info", e.target.value)}
              />
              <div className="flex gap-4">
                <Select
                  label="省份"
                  value={formData.province}
                  onChange={handleProvinceChange}
                >
                  <SelectItem value="">请选择省份</SelectItem>
                  {areaData.map((province) => (
                    <SelectItem key={province.value} value={province.label}>
                      {province.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="城市"
                  value={formData.city}
                  onChange={handleCityChange}
                  disabled={!formData.province}
                >
                  <SelectItem value="">请选择城市</SelectItem>
                  {cityList.map((city) => (
                    <SelectItem key={city.value} value={city.label}>
                      {city.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="区/县"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  disabled={!formData.city}
                >
                  <SelectItem value="">请选择区/县</SelectItem>
                  {districtList.map((district) => (
                    <SelectItem key={district.value} value={district.label}>
                      {district.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button flat color="error" onPress={onClose}>
                取消
              </Button>
              <Button isLoading={isLoading} onPress={handleSubmit}>
                提交
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ApplicationDialog;
