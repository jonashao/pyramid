<template>
  <div>
    <v-container fluid grid-list-xs>
      <v-layout style="margin-left:-16px;margin-right:-16px;" row >
        <v-flex v-for="c in categories" :key="c._id" md2 sm4 xs6>
          
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ c.name? c.name:'未命名' }}</div>
                <span>{{ c.desc }}</span>
              </div>
            </v-card-title>
            <v-card-actions >
              <v-spacer/>
              
              <v-layout row justify-center>
                <v-btn icon>
                  <v-icon color="white" @click="deleteDialog = true">delete</v-icon>
                </v-btn>
                <v-dialog v-model="deleteDialog" max-width="290" >
                  <v-card>
                    <v-card-title class="headline">
                      确定要删除文章分类 <span color="green darken-1">{{ c.name }}</span> 吗?
                    </v-card-title>

                    <v-card-text>
                      该分类下的文章不会被删掉,将转移到“未分类”下
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer/>
                      <v-btn color="green darken-1" flat="flat" @click="deleteDialog = false" >取消 </v-btn>
                      <v-btn color="red darken-1" flat="flat" @click="deleteDialog = false;deleteCategory(c)" >确定 </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
              <v-btn icon @click="modify(c)">
                <v-icon color="white">edit</v-icon>
              </v-btn>
            
            </v-card-actions>          
          </v-card>
        </v-flex>
  


      </v-layout>
    </v-container>
 
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" fab dark style="position: fixed;right: 2rem;">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">文章分类信息</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 >
                  <v-text-field v-model="category.name" name="name" outline label="名称*" required/>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field name="image" outline label="图片" />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field name="color" outline label="颜色" />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    :value="category.desc"
                    outline
                    name="desc"
                    label="描述"
                  />
                </v-flex>
              
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="dialog = false">Close</v-btn>
            <v-btn flat @click="save()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      category: {}
    }
  },
  computed: mapState({
    // 传字符串参数 'count' 等同于 `state => state.count`
    categories: state => state.category.all
  }),
  mounted() {
    if (this.categories === undefined || !this.categories.length) {
      this['category/fetch']()
    }
  },
  methods: {
    ...mapActions([
      'category/fetch' // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ]),
    deleteCategory(c) {
      this.$axios.delete(`category/${c._id}`).then(({ status, data }) => {
        if (status === 200 && data.ok) {
          this['category/fetch']()
          this.$store.commit('snackbar/setState', {
            show: true,
            text: `成功删除文章分类${c.name ? c.name : '未命名'}`
          })
        }
      })
    },
    modify(c) {
      this.category = c
      this.dialog = true
    },
    save() {
      this.$axios
        .post('/category/save', this.category)
        .then(({ status, data }) => {
          if (status === 200 && data.success) {
            this['category/fetch']()
            this.$store.commit('snackbar/setState', {
              show: true,
              text: `成功创建文章分类${
                this.category.name ? this.category.name : '未命名'
              }`
            })
            this.dialog = false
            this.category = {}
          }
        })
    }
  }
}
</script>
