#ifndef __QIMATA__CODEGENERATORS__COMMON__GENERATORS__STRING_GENERATOR__HPP__
#define __QIMATA__CODEGENERATORS__COMMON__GENERATORS__STRING_GENERATOR__HPP__

#include "../models/cpp_type_model.hpp"

namespace qimata
{
	namespace codegenerators
	{
		namespace common
		{
			namespace generators
			{
				class string_generator
				{
				public:
					explicit string_generator(const models::cpp_type_model& cpp_type_model);

					virtual ~string_generator();
					virtual std::string get_class_declartion() const;
				protected:
					virtual std::string get_include_guard() const;
					virtual std::string get_namespace_and_class() const;
				private:
					std::string get_tabs(size_t tab_count) const;
					std::string new_line_at_tab_count(size_t tab_count, std::string line) const;
				private:
					const models::cpp_type_model cpp_type_model_;
				};
			}
		}
	}
}


#endif //__QIMATA__CODEGENERATORS__COMMON__GENERATORS__STRING_GENERATOR__HPP__