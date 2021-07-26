<template>
  <app-button
    @click="isActiveForm = !isActiveForm"
    color="btn-info ms-auto mb-5"
    >{{ isActiveForm ? "Close form" : "Add" }}</app-button
  >
  <transition name="slide-fade">
    <el-card class="box-card" v-if="isActiveForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Id" prop="id">
          <el-input v-model.number="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="ruleForm.firstName"></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="ruleForm.lastName"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="Phone">
          <el-input
            v-model="ruleForm.phone"
            v-maska="'(###)###-####'"
            placeholder="(999)999-9999"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-item--ml-0">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Create</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>
<script>
import { mapActions } from "vuex";
import AppButton from "@/components/AppButton";
export default {
  components: {
    AppButton,
  },
  data() {
    const checkValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the id"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("Please input digits"));
      } else {
        callback();
      }
    };
    return {
      isActiveForm: false,
      ruleForm: {
        id: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
      },
      rules: {
        firstName: [
          {
            required: true,
            message: "Please input First Name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "Length should be 3 to 10",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please input Last Name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "Length should be 3 to 10",
            trigger: "blur",
          },
        ],
        id: [{ validator: checkValue, trigger: "blur" }],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input phone number",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = {
            id: this.ruleForm.id,
            firstName: this.ruleForm.firstName,
            lastName: this.ruleForm.lastName,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone,
          };
          this.addUser(formData);
          this.$refs.ruleForm.resetFields();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions(["addUser"]),
  },
};
</script>
<style lang="scss">
.el-card {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.el-form-item {
  &--ml-0 {
    .el-form-item__content {
      @media (max-width: 500px) {
        margin-left: 0 !important;
      }
    }
  }
}
.el-button {
  @media (max-width: 500px) {
    display: block;
    width: 100%;
    &--default {
      margin-left: 0 !important;
      margin-top: 15px !important;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
